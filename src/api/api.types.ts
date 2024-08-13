import { UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type QueryOptions<T> = Omit<
  UseQueryOptions<T, AxiosError, T>,
  "queryKey"
>;
