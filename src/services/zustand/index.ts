import create from "zustand";
import supabase from "../supabase";
import { User } from "@supabase/supabase-js";
import env from "../../configs/vars";
import axios from "axios";

const API = axios.create({ baseURL: env.reactAppHost });
var userJson: string = "";
if (typeof window !== "undefined") {
  userJson = localStorage.getItem("sb-wnpukijoybwfgrpearge-auth-token");
}
const user = userJson ? JSON.parse(userJson) : null;
const tokenProfile = user ? user.access_token : null;

API.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${tokenProfile}`;
  return req;
});
interface Interface {
  getUser: (id: any) => void;
  getUsers: (limit: number, page: number, searchQuery: any) => void;
  createUser: (formData: any) => void;
  updateUser: (formData: any, id: string) => void;
  delUser: (id: any) => void;
  users: object | null;
  user: object | null;
}

export const useZustandStore = create<Interface>((set, get) => ({
  users: { data: [], pagination: {} },
  user: { data: [], pagination: {} },
  getUsers: async (limit, page, searchQuery) => {
    try {
      const { data }: any = await API.get(
        `api/user?limit=${limit}&page=${page}&search=${searchQuery}&orderBy=name&orderDirection=asc`
      );
      set(() => ({
        users: data,
      }));
      return data;
    } catch (error) {
      return error;
    }
  },
  getUser: async (id) => {
    try {
      const { data }: any = await API.get(`api/user/${id}`);
      set(() => ({
        user: data,
      }));
      return data;
    } catch (error) {
      return error;
    }
  },
  createUser: async (formData) => {
    try {
      await API.post(`/api/user`, formData);
    } catch (error) {
      return error;
    }
  },
  updateUser: async (formData, id) => {
    try {
      await API.put(`/api/user/${id}`, formData);
    } catch (error) {
      return error;
    }
  },
  delUser: async (id) => {
    try {
      await API.delete(`api/user/${id}`);
    } catch (error) {
      return error;
    }
  },
}));
