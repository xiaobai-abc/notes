import { Outlet } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import "./index.less";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/components/ui/alert-dialog";
import { Button } from "@/shadcn/components/ui/button";
import { useState } from "react";

export default function ClassifyPage() {
  const [htmlv, setHtml] = useState("");

  function onTestfun() {
    axios.get("http://127.0.0.1:3000/api/result").then(({ data }) => {
      console.log(data);
      // setHtml(JSON.parse(data.data));
    });
  }

  return (
    <div>
      <div className="flex items-start w-full border border-red-500 border-solid p-5">
        <div className="border border-blue-500 border-solid">
          <label>
            <div
              className="bg-red-100 cursor-pointer hover:bg-red-200 has-[:checked]:bg-red-500"
              style={{ width: "100px", height: "100px" }}
            >
              <input type="radio" style={{ width: "100px", height: "100px" }} />
            </div>
          </label>
        </div>
        <div className="border border-pink-500 border-solid ml-5">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="cursor-pointer py-0">open</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div>
          <Button className="ml-5 px-5 py-0 cursor-pointer" onClick={onTestfun}>
            测试
          </Button>
        </div>
      </div>

      <div>
        <pre
          className="text-gray-500  border border-red-500 mt-5"
          style={{ whiteSpace: "pre-wrap",lineHeight : 1.5 }}
        >
          {htmlv}
        </pre>
      </div>
    </div>
  );
}
