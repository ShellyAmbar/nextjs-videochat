"use client";
import Form from "@/components/LoginPage/Form";
import {CookiesProvider} from "react-cookie";

export default function Home() {
  return (
    <CookiesProvider defaultSetOptions={{path: "/"}}>
      <div className="bg-image min-h-screen w-full flex justify-center items-center">
        <div className="card w-[90%] md:w-2/3 lg:w-2/5 bg-base-100 rounded-lg">
          <div className="card-body">
            {/* FORM */}
            <Form />
          </div>
        </div>
      </div>
    </CookiesProvider>
  );
}
