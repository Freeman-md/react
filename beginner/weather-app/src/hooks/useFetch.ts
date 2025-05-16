import { useCallback, useState } from "react";

export const useFetch = <T = unknown>() => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const execute = useCallback(async (url: string): Promise<T | undefined> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error?.message || "Failed to fetch weather." // this should be customizable
                );
            }

            const json = await response.json() as T;

            setData(json)

            return json
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Something went wrong");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }, [])

    return {
        loading,
        data,
        error,
        execute
    }

}