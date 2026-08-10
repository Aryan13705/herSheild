import { trpc } from '../../lib/trpc';

export function useSavedPlaces() {
  const utils = trpc.useUtils();
  
  const { data: savedPlaces, isLoading, error } = trpc.maps.getSavedPlaces.useQuery(undefined, {
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });

  const savePlaceMutation = trpc.maps.savePlace.useMutation({
    onMutate: async (newPlace) => {
      await utils.maps.getSavedPlaces.cancel();
      const previousPlaces = utils.maps.getSavedPlaces.getData();
      
      utils.maps.getSavedPlaces.setQueryData(undefined, (old) => {
        if (!old) return [];
        return [...old, { id: 'temp-id', userId: 'temp', createdAt: new Date(), updatedAt: new Date(), ...newPlace }];
      });
      
      return { previousPlaces };
    },
    onError: (err, newPlace, context) => {
      if (context?.previousPlaces) {
        utils.maps.getSavedPlaces.setQueryData(undefined, context.previousPlaces);
      }
    },
    onSettled: () => {
      utils.maps.getSavedPlaces.invalidate();
    },
  });

  const unsavePlaceMutation = trpc.maps.unsavePlace.useMutation({
    onMutate: async ({ id }) => {
      await utils.maps.getSavedPlaces.cancel();
      const previousPlaces = utils.maps.getSavedPlaces.getData();
      
      utils.maps.getSavedPlaces.setQueryData(undefined, (old) => {
        if (!old) return [];
        return old.filter((place) => place.id !== id);
      });
      
      return { previousPlaces };
    },
    onError: (err, newPlace, context) => {
      if (context?.previousPlaces) {
        utils.maps.getSavedPlaces.setQueryData(undefined, context.previousPlaces);
      }
    },
    onSettled: () => {
      utils.maps.getSavedPlaces.invalidate();
    },
  });

  return {
    savedPlaces: savedPlaces || [],
    isLoading,
    error,
    savePlace: savePlaceMutation.mutate,
    savePlaceAsync: savePlaceMutation.mutateAsync,
    isSaving: savePlaceMutation.isPending,
    unsavePlace: unsavePlaceMutation.mutate,
    unsavePlaceAsync: unsavePlaceMutation.mutateAsync,
    isUnsaving: unsavePlaceMutation.isPending,
  };
}
