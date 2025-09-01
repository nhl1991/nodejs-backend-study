import { FormEvent } from "react"


export default function Page(){

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/api/login', {
            method: 'post',
            body: formData
        })
        
    }


    return(
        <div>

            <form onSubmit={handleOnSubmit}>
                <div>
                    <input type="text" name="userid" />
                </div>
                <div>
                    <input type="password" name="password" />

                </div>
            </form>
        </div>
    )
}