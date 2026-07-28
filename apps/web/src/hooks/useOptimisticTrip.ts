import { trpc } from "../lib/trpc";
import { useAnalytics } from "../context/useAnalytics";

export function useOptimisticTripCreate() {
  const utils = trpc.useUtils();
  const { trackEvent } = useAnalytics();

  return trpc.trips.create.useMutation({
    onMutate: async (newTrip) => {
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await utils.trips.list.cancel();

      // Snapshot the previous value
      const previousTrips = utils.trips.list.getData();

      // Optimistically update to the new value
      utils.trips.list.setData(undefined, (old) => {
        const optimisticTrip = {
          id: `temp-${Date.now()}`,
          title: newTrip.title,
          status: "PLANNING",
          startDate: newTrip.startDate,
          endDate: newTrip.endDate,
          primaryDestination: "Pending...",
        };
        return old ? [...old, optimisticTrip] : [optimisticTrip];
      });
      
      // Track analytics event
      trackEvent({
        category: "TRAVEL",
        action: "TRIP_CREATED",
        label: newTrip.title,
      });

      // Return a context object with the snapshotted value for rollback
      return { previousTrips };
    },
    onError: (err, newTrip, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTrips) {
        utils.trips.list.setData(undefined, context.previousTrips);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      utils.trips.list.invalidate();
    },
  });
}
