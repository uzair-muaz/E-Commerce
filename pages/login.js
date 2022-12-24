import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { useSession, signIn, signOut } from "next-auth/react"
import getError from '../utils/error'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function LoginScreen() {
    const router = useRouter();
    const { data: session } = useSession()

    const { redirect } = router.query;

    useEffect(() => {
        //if session exists it means the user already singned in 
        if (session?.user) {
            //redirect will be obtained from the router querey
            router.push(redirect || '/');
        }

    }, [router, session, redirect]);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const login = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error(getError(error));
        }
    };
    return (
        <Layout title="Login">
            <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(login)}
            >
                <h1 className="mb-4 text-xl">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Please enter email',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: 'Please enter valid email',
                            },
                        })}
                        className="w-full"
                        id="email"
                        autoFocus
                    ></input>
                    {errors.email && (
                        <div className="text-red-500">{errors.email.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Please enter password',
                            minLength: { value: 6, message: 'Password is more than 5 chars' },
                        })}
                        className="w-full"
                        id="password"
                        autoFocus
                    ></input>
                    {errors.password && (
                        <div className="text-red-500 ">{errors.password.message}</div>
                    )}
                </div>
                <div className="mb-4 ">
                    <button className="primary-button">Login</button>
                </div>
                <div className="mb-4 ">
                    Don&apos;t have an account? &nbsp;
                    <Link href="register">Register</Link>
                </div>
            </form>
        </Layout>
    );
}