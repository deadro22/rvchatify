import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";
import { withRouter } from "react-router-dom";
import CommentPostMain from "./CommentMainPost";
import PostFormMain from "./PostMainPageComponents/PostFormM";
import PostHeaderMini from "./PostMainPageComponents/PostHeaderMini";
import PostVideoImagePrev from "./BasicComponents/PostVideoImagePrev";

class PostMainPageComponent extends Component {
  state = {
    likes: 0,
    comments: 0,
    likesCount: 0,
    showComments: true,
  };
  componentDidMount() {
    this.likeHeartRef = React.createRef();
    this.setState({
      likes: this.props.post.likes,
      comments: this.props.post.postComments[0].comments,
      likesCount: this.props.post.likes.length,
    });
  }
  addCommentOnPost = (nComment) => {
    const newComments = [...this.state.comments];
    newComments.push(nComment);
    this.setState({ comments: newComments });
  };
  toggleComments = () => {
    this.setState({
      showComments: !this.state.showComments,
    });
  };
  render() {
    const { post, socket, user } = this.props;
    return (
      <Spring
        from={{ opacity: 0, transform: "scale(1.05)" }}
        to={{ opacity: 1, transform: "scale(1)" }}
      >
        {(props) => (
          <div className="pst_mn" style={props}>
            <div className="pst_mn_img_prev">
              <PostVideoImagePrev post={post} />
            </div>
            <div className="pst_mn_mr_info">
              <PostHeaderMini
                post={post}
                closable={true}
                history={this.props.history}
              />
              <hr />
              <PostFormMain
                user={user}
                socket={socket}
                post={post}
                toggleComments={this.toggleComments}
                commentsCount={this.state.comments}
                addCommentOnPost={this.addCommentOnPost}
              />
              <hr />
              {this.state.showComments && (
                <div className="pst_comments_lst_h">
                  {this.state.comments.length > 0 ? (
                    this.state.comments.map((comment, index) => (
                      <React.Fragment key={index}>
                        <CommentPostMain postComment={post} comment={comment} />
                        <hr />
                      </React.Fragment>
                    ))
                  ) : (
                    <div>
                      <h3>No comments</h3>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default withRouter(PostMainPageComponent);
