'use client'

import { FormEvent, MouseEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const userIdRef = useRef<HTMLInputElement>(null)
  const [isValid, setIsVaild] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if(!isValid) return;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch('api/register', { method: 'POST', body: formData })
    if(response.ok){
      router.push('/result');
    }
  }
  const handleOnClick = async () => {
    if (!userIdRef.current || userIdRef.current.value == "") return;

    const response = await fetch('api/validateUserId', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userIdRef.current?.value)
    })

    const { message, isValid } = await response.json();
    setIsVaild(isValid);
    setMessage(message);

  }


  return (
    <div>
      <form className="p-2 bg-sky-900 flex flex-col" onSubmit={handleOnSubmit} method="get">
        <div>
          <label htmlFor="userid">username </label>
          <input ref={userIdRef} id="userid" name="userid" type="text"></input>
          <button type="button" onClick={handleOnClick}>아이디 중복 확인</button>
          <div><span>{message}</span></div>
        </div>
        <div>
          <label htmlFor="password">password </label>
          <input id="password" name="password" type="password"></input>
        </div>
        <div>
          {isValid ? <input type="submit" value={'submit'}></input> : <p>Please validate ID.</p>}
        </div>
      </form>

    </div>
  );
}
