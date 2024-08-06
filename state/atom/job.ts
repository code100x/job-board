"use client";
import { atom } from "recoil";
import { Job } from "@prisma/client";


export const jobState = atom<Job[]>({
    key: 'textState', 
    default: [], 
  });