"use client";
import React from "react";
import Link from "next/link";
export default function Stub(props: any) {
  const label = props?.title ?? props?.label ?? null;
  return (
    <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
      {label ? <div className="font-medium mb-1">{label}</div> : null}{props?.children}
    </div>
  );
}
export const Card: any = Stub;
export const ChartCard: any = Stub;
export const DataTable: any = Stub;
export const Hero: any = Stub;
export const StatCard: any = Stub;
