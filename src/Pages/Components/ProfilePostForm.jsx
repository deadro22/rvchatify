import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";
import "../Styles/PostForm.css";
import axios from "axios";
import Joi from "joi";
import Loader from "./BasicComponents/Loader";

class ProfilePostForm extends Component {
  state = {
    posting: false,
  };
  addImagePreview = (e) => {
    if (this.PrevImgRef.files[0]) {
      let nfile = this.PrevImgRef.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(nfile);
      reader.onloadend = (e) => {
        this.setState({ PreviewImgsrc: reader.result, srcType: nfile.type });
      };
    }
  };
  handlePostData = async (e) => {
    e.preventDefault();
    const validationSchema = {
      postHeader: Joi.string().required(),
      post_image: Joi.required(),
    };
    const postData = {
      post_image: this.PrevImgRef.files[0],
      postHeader: this.postHeader.value,
    };
    const { error } = Joi.validate(postData, validationSchema);
    if (error) return console.log(error.details[0].message);
    const bodyformData = new FormData();
    bodyformData.set("postHeader", postData.postHeader);
    bodyformData.append("post_prev", postData.post_image);
    bodyformData.set("src_type", this.PrevImgRef.files[0].type);
    try {
      this.setState({ posting: true });
      await axios.post(
        "/api/posts/post/" + this.props.authUser.username + "/new",
        bodyformData,
        { withCredentials: true }
      );
      return this.props.history.push(
        "/profile/" + this.props.authUser.username
      );
    } catch (e) {
      this.setState({ posting: false });
      console.log(e.response);
    }
  };
  render() {
    return (
      <Spring
        from={{ opacity: 0, transform: "translate(0,-90px)" }}
        to={{ opacity: 1, transform: "translate(0,0px)" }}
        config={{ friction: 17, tension: 100 }}
      >
        {(props) => (
          <div className="post_addfr_mn" style={props}>
            <form methd="POST" onSubmit={this.handlePostData}>
              <textarea
                placeholder="What's on your mind"
                ref={(ref) => (this.postHeader = ref)}
              ></textarea>
              {this.state.PreviewImgsrc && (
                <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                  {(props) => (
                    <div className="prv_pst_img_g" style={props}>
                      {this.state.srcType === "video/mp4" ? (
                        <video muted controls id="prv_img">
                          <source src={this.state.PreviewImgsrc} />
                        </video>
                      ) : (
                        <img
                          src={this.state.PreviewImgsrc}
                          alt=""
                          id="prv_img"
                        />
                      )}
                      <i
                        className="fal fa-times"
                        onClick={() =>
                          this.setState({ PreviewImgsrc: undefined })
                        }
                      ></i>
                    </div>
                  )}
                </Spring>
              )}
              <div className="fl_hld_k ">
                <div className="fl_upld_holder">
                  <input
                    ref={(ref) => (this.PrevImgRef = ref)}
                    type="file"
                    name="post_image"
                    id="fl_upld_r"
                    onChange={this.addImagePreview}
                  />
                  <i className="fa fa-camera"></i>
                </div>
                {this.state.posting ? (
                  <Loader customSpacing={"30px"} size={"7px"} mrr={"15px"} />
                ) : (
                  <button
                    type="submit"
                    className="prf_bt t-dark-sld"
                    style={{ backgroundColor: "#57585A" }}
                  >
                    Post
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </Spring>
    );
  }
}

export default ProfilePostForm;
