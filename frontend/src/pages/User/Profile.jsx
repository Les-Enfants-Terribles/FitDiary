import {Flex, Heading} from "@chakra-ui/react";
import React, {useContext, useEffect, useState} from "react";
import {FetchContext} from "../../context/FetchContext";
import {UserMainBox} from "../../components/UserMainBox";
import {UserInfoBox} from "../../components/UserInfoBox";

const urlGetInfo = `utenti/profilo`;

export default function Profile() {
    const [utente, setUtente] = useState({ nome: "pippo" });
    const [isLoading, setLoading] = useState(true);
    const fetchContext = useContext(FetchContext);

    useEffect(() => {
        console.log("pages/users/profile");
        const getInfoUtente = async () => {
            try {
                const { data } = await fetchContext.authAxios.get(urlGetInfo)
                setUtente(data.data.utente);
                setLoading(false);
            } catch (error) {
                console.log("error", error);
            }
        };
        getInfoUtente();
    }, [fetchContext]);

    return (
        <>
            {!isLoading && (
                <Flex wrap={"wrap"} p={5}>
                    <Heading w={"full"} textAlign={"center"} mb={5}>Profilo Utente</Heading>
                    <UserMainBox utente={utente} showMoreBtns={false}/>
                    <UserInfoBox utente={utente}/>
                </Flex>
            )}</>
    )
}