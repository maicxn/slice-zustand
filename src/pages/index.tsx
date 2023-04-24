import Image from 'next/image'
import { Inter } from 'next/font/google'
import { wishListStore } from '@/store'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [wish, setWish] = useState("")

  const wishList = wishListStore()

  return (
    <div>
      wishes: {wishList.wishes.length}
      <input type="text" value={wish} onChange={(e: any) =>setWish(e.target.value)} />  
      <button onClick={() => wishList.createWish(wish)}>Submit</button>

      <div>
        {wishList.wishes.map(i => <>
          <p>{i}</p>
          <br />
        </>
        )}
      </div>
    </div>
  )
}
