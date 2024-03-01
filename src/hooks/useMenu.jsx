import { useState } from 'react';
import { useEffect } from 'react';

const useMenu = () => {
    const [menu,setMenu]=useState([]);
    const [loading, setLoading]=useState(true)

    useEffect(() => {
        fetch('http://localhost:3000/menu')
            .then(res => res.json())
            .then(data => setMenu(data))
    }, [])
    return [menu];
}

export default useMenu;