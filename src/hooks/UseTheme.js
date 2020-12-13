import { useEffect, useState } from 'react';

export default () => {

    const [theme, setTheme] = useState('dark');
    

    const toggleTheme = () => {
        if(theme === 'light') {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
        
    }

    return [theme, toggleTheme]
}