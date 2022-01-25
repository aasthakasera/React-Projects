import {React} from "react";
import {Link} from "react-router-dom";

const Error = () => {
    return(
        <section>
            <div className="container">
                <h4>This page doesn't exist.</h4>
                <Link to="/" className="btn btn-primary">
                    back Home
                </Link>
            </div>
        </section>
    )
}

export default Error