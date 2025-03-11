'use client'

import { useCallback } from "react";
import styles from './components.module.css';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import debounce from "lodash.debounce";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export const SearchForm = ({type}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, prefetch } = useRouter();
    
    const schema = yup.object({
        search: yup.string().required('The search term is required').max(25, "max 25 characters allowed")
    });

    const { register, trigger } = useForm({
        resolver: yupResolver(schema)
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps    
    const handleChange = useCallback(
        debounce(async (event) => {
            event.preventDefault();
            const searchTerm = event.target.value;
            const params = new URLSearchParams(searchParams);
            if (searchTerm) {
                const isValid= await trigger("search")
                if(isValid){
                    params.set('term', searchTerm);
                }                
            } else {
                params.delete('term');
                replace(`${pathname}`);
            }
            prefetch(`${pathname}?${params.toString()}`);
            replace(`${pathname}?${params.toString()}`);        
        }, 300),
        [debounce, register, trigger, prefetch, replace] 
    );

    return (
        <form className={styles.searchForm_container}>
            <label htmlFor="search">Search {type}</label>
            <input
                type="text"
                placeholder="Search..."
                {...register("search", { onChange: handleChange })}
                defaultValue={searchParams.get('term')?.toString()}
            />         
        </form>
    );
};
