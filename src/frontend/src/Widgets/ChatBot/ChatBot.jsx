import React from "react";
import "./ChatBot.scss";
import { FaPaperclip } from "react-icons/fa6";
import { FaRegPaperPlane } from "react-icons/fa6";
import User_1 from "../../assets/images/user1.jpg";
import Chat_Bot_Avatar from "../../assets/images/chatBot.avif";
import ChartInChat from "../ChartInChat/ChartInChat";
export default function ChatBot() {
  return (
    <div className="chatBot bg-primary-deep py-10 ps-7 pe-6 h-full rounded-md">
      <div className="flex flex-col h-full">
        <div className="h-full mb-8 overflow-y-auto pe-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div className="flex flex-col" key={index}>
              <div className="my_c flex max-w-8/12 ms-auto mt-5">
                <div className="content chat_arrow_right relative bg-primary rounded-[5px] p-3 brightness-75 ">
                  <div>Great! It's been a while...</div>
                </div>
                <div className="mt-auto ms-3">
                  <div className="userIcon w-15 h-15 rounded-full overflow-hidden ">
                    <img
                      src={User_1}
                      alt="Alex User"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="c_bot_replay flex max-w-11/12 me-auto mt-5">
                <div className="mt-auto me-3">
                  <div className="userIcon w-15 h-15 rounded-full overflow-hidden ">
                    <img
                      src={Chat_Bot_Avatar}
                      alt="Alex User"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="content chat_arrow_left relative bg-primary rounded-[5px] p-3">
                  <div>
                    <ChartInChat />
                    Indeed.... We're gonna have to fix that. Lorem Ipsum is
                    simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book.
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="last  w-full"></div>
        </div>

        <div className="input_box-wrapper flex items-center bg-white rounded-4xl">
          <label className="attach_file h-15 px-4 flex cursor-pointer">
            <input type="file" name="" id="" hidden />
            <FaPaperclip className="text-primary m-auto size-6" />
          </label>
          <input
            type="text"
            placeholder="Text Message"
            className="flex-grow py-0  leading-15 text-black border-0 outline-0 focus:border-0 focus:outline-0"
          />

          <div className="send_btn h-15 px-4 flex cursor-pointer">
            <FaRegPaperPlane className="text-primary m-auto size-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
