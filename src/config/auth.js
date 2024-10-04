import toast from "react-hot-toast";

export const loginFunction = async (userNameValue, passwordValue, setUser, Router) => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName: userNameValue, password: passwordValue }),
            credentials: 'include',
        });
       
        const result = await response.json();
        if (result?.error) {
            toast.error(result?.error)
            return;
        } else {
            const { user } = result;
            setUser({ ...user });
            toast.success('Bienvenido '+ user.name);
            //Router.push('/');
        };
        return result;
    } catch (error) {
        console.error('Login error:', error);
        toast.error("Login error: view console");
        return;
    };
};


export const registerFunction = async (data, setIsLoading, resetField, Router) => {
    try {
        setIsLoading(true);
        const { emailValue, passwordValue, nameValue, birthDateValue, lastNameValue, userNameValue } = data;

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailValue, password: passwordValue, name: nameValue, birthdate: birthDateValue.toString(), last_name: lastNameValue, username: userNameValue, rol: 'user' }),
        });

        const result = await response.json();

        if (result?.error) {
            toast.error(result?.error)
        } else {
            resetField()
            toast.success('Successful registration');
            Router.push('/auth');
        }
        setIsLoading(false);
        return;

    } catch (error) {
        console.error('Register error:', error);
        toast.error("Register error: view console");
        setIsLoading(false);
        return;
    };
};


export const logoutFunction = async (Router) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const result = await response.json();

        toast.success(result?.message)
        

        return;
    } catch (error) {
        console.error('Log Out error:', error);
        toast.error("Log Out error: view console");
        return;
    }
};

export const checkSessionFunction = async (setUser, Router) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/check-session`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const result = await response.json();
        if (response.status === 200) {

            const { user } = result;
            setUser({ ...user });
            toast.success('Bienvenido '+ user.name);

        } else {
            //Router.push('/');
            setUser(null)
        }
        return;
    } catch (error) {
        console.error('Check session error:', error);
        //toast.error("Check session error: view console");
        return;
    }
}


