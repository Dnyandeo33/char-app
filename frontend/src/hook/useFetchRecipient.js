import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const recipientId = chat?.members?.find(id => id !== user?.id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null
            const response = await axios(`http://localhost:3000/${recipientId}`)

            if (response.error) {
                console.log(response.error);
            }
            setRecipientUser(response.data.user)
        }
        getUser()


    }, [recipientId])

    return { recipientUser }

}
