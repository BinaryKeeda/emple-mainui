import React from "react";
import DataListing from "./components/DataListing";
import { Title } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";


const ProblemList = () =>{

    return (
        <>
        <Helmet>
            <title> Binarykeeda | DSA problems</title>
        </Helmet>
        <DataListing type="problems" />;

        </>
    )
}
export default ProblemList;
