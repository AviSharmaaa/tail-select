"use client";
import { User } from "@/data";
import Dog from "@/assets/dog.png";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import Image from "next/image";

interface SelectProps {
  placeholder?: string;
  options: User[];
}

function MultiSelect({ options, placeholder }: SelectProps) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [inputString, setInputString] = useState("");
  const [highlightedUserIndex, setHighlightedUserIndex] = useState(0);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputString(e.target.value);
    if (e.target.value !== "") {
      const currentSelectedUserNames = selectedUsers.map((user) => user.name);
      setFilteredUsers(
        options.filter(
          (option) =>
            !currentSelectedUserNames.includes(option.name) &&
            option.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else setFilteredUsers([]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !inputString) {
      setSelectedUsers((prev) => prev.slice(0, -1));
    } else if (event.key === "ArrowDown") {
      setHighlightedUserIndex((prev) => (prev + 1) % filteredUsers.length);
    } else if (event.key === "ArrowUp") {
      setHighlightedUserIndex(
        (prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length
      );
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUsers((prev) => [...prev, user]);
    resetInputFields();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = filteredUsers[highlightedUserIndex];
    if (user) {
      handleUserClick(user);
    }
  };

  const resetInputFields = () => {
    setInputString("");
    setFilteredUsers([]);
    setHighlightedUserIndex(0);
  };

  return (
    <div className="border border-white rounded-md p-2 flex relative w-full items-center">
      <div className="mr-1 flex flex-wrap items-center">
        {selectedUsers.map((user) => (
          <div
            key={user.name}
            className="shadow-sm mx-1 outline outline-1 outline-[#f67403] h-min bg-[#2c313d] flex items-center p-0 leading-none rounded-2xl overflow-hidden my-1"
          >
            <div>
              <Image
                className="w-5 h-5 rounded-full"
                src={Dog}
                alt="Rounded avatar"
              />
            </div>
            <p className="text-xs flex-1 pl-1">{user.name}</p>
            <span
              className=" ml-1 hover:bg-[#f67403] delay-50 transition-colors text-white hover:text-white cursor-pointer p-1"
              onClick={() => {
                setSelectedUsers((prev) => prev.filter((x) => x !== user));
              }}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="w-full min-w-24">
          <input
            className="focus-visible:border-0 focus-visible:outline-0 w-full bg-transparent"
            placeholder={placeholder}
            value={inputString}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              const currentSelectedUserNames = selectedUsers.map(
                (user) => user.name
              );
              setFilteredUsers(
                options.filter(
                  (option) =>
                    !currentSelectedUserNames.includes(option.name) &&
                    option.name
                      .toLowerCase()
                      .includes(inputString.toLowerCase())
                )
              );
            }}
          />
          <button type="submit" className="den" />
        </form>
        {filteredUsers.length > 0 && (
          <div className="max-h-[250px] absolute top-[110%] left-0 w-full shadow-md z-20 rounded-sm overflow-auto">
            <ul className="bg-white">
              {filteredUsers.map((user, index) => (
                <li
                  className={`hover:bg-[#242733] bg-[#171923] px-4 py-2 cursor-pointer ${
                    highlightedUserIndex === index && "bg-[#242733]"
                  }`}
                  key={user.name}
                  onClick={() => handleUserClick(user)}
                >
                  <div className="flex">
                    <div>
                      <Image
                        className="w-8 h-8 rounded-full"
                        src={Dog}
                        alt="Rounded avatar"
                      />
                    </div>
                    <div>
                      <p className="text-xs flex-1 pl-2">{user.name}</p>
                      <p className="text-xs flex-1 pl-2">{user.email}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {selectedUsers.length > 0 && (
        <div
          className="cursor-pointer"
          onClick={() => {
            setInputString("");
            setFilteredUsers([]);
            setSelectedUsers([]);
            setHighlightedUserIndex(0);
          }}
        >
          <span>&times;</span>
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
