import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addClaimRequest,
  getReceivedClaimRequest,
} from "../services/claimRequest";
import { FieldValues } from "react-hook-form";

export const useAddClaimRequest = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADD_CLAIM_REQUEST"],
    mutationFn: async (claimData) => await addClaimRequest(claimData),
    onSuccess: () => toast.success("Claim request send successfully"),
    onError: (error) => toast.error(error?.message),
  });
};

export const useGetReceivedClaimRequest = () => {
  return useQuery({
    queryKey: ["RECEIVED_CLAIM_REQUEST"],
    queryFn: async () => await getReceivedClaimRequest(),
  });
};
