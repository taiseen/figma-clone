import useInterval from "../useInterval";

// Remove reactions that are not visible anymore (every 1 sec)
const useRemoveReactions = (setReactions: any) => {

  return useInterval(() => {

    setReactions((reactions: any) =>
      reactions.filter(
        (reaction: any) => reaction.timestamp > Date.now() - 4000
      )
    );

  }, 1000);
  
};

export default useRemoveReactions;
