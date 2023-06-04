import React from "react";
import Layout from "../components/layout/layout";

const withLayout = Component => {
    return ({...props}) => (
        <Layout>
            <Component {...props}/>
        </Layout>
    );
};

export default withLayout;