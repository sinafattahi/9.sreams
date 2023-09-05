import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreameForm from "./StreameForm";

class StreamCreate extends React.Component {

   
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }


    render() {
        return (
            <div>
                <h3>Create a Stream</h3>
                <StreameForm onSubmit={this.onSubmit} />
            </div>
           
        );
    }  
}

export default connect(null, {createStream})(StreamCreate);