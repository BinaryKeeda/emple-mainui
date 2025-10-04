import React from "react";
import DataListing from "./components/DataListing";
import { Title } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const UserSolutionList = () =>{
    const user = useSelector(s=>s.auth);
    const {slug} = useParams();
    return (
        <>
        <Helmet>
            <title> Binarykeeda | User Solutions</title>
        </Helmet>
        <DataListing type={"solutions/"+slug} />
        </>
    )
}
export default UserSolutionList;
