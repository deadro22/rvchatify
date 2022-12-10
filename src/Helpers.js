import axios from "axios";

class Helpers {
  getBackendLink() {
    return /*"https://cht-bck-d.herokuapp.com"*/ "http://localhost";
  }
  setPostTimeDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear(),
      minutes = d.getMinutes().toString(),
      hours = d.getHours().toString();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (minutes.length < 2) minutes = "0" + minutes;
    if (hours.length < 2) hours = "0" + hours;
    if (day === d.getDate()) {
      return `Today | ${hours}:${minutes}`;
    } else {
      return `${[year, month, day].join("-")} | ${hours}:${minutes}`;
    }
  }
  likePost(postId, user, socket) {
    socket.emit("likePost", {
      postId: postId,
      userId: user._id,
    });
  }
  commentPost(e, socket, post, user, commentbody) {
    if (e.key === "Enter" && commentbody.length > 0) {
      socket.emit("commentPost", {
        postId: post.postId,
        userId: user._id,
        commentBody: commentbody,
      });
    }
  }
  returnBack(history) {
    return history.goBack();
  }
  async loadOnFetchScroll(state, url, cst, scst) {
    let scrollCondition =
      document.scrollingElement.scrollHeight -
        document.scrollingElement.scrollTop ===
      document.scrollingElement.clientHeight;
    if (scrollCondition) {
      cst();
      const newhomePosts = await axios.get(url, {
        withCredentials: true,
        params: { skp_count: state.skipCount },
      });
      if (newhomePosts.data.homePosts.length > 0) {
        const h_p = state.posts;
        const ccp = h_p.concat(newhomePosts.data.homePosts);
        return scst({
          posts: ccp,
          skipCount: ccp.length,
          newLoading: false,
          canLoadData: true,
        });
      } else {
        return scst({
          postLimit: true,
          newLoading: false,
          canLoadData: false,
        });
      }
    }
  }
  toggleSearch(state) {
    if (state) {
      document.body.style.overflow = "auto";
      return false;
    } else {
      document.body.style.overflow = "hidden";
      return true;
    }
  }
}

export default new Helpers();
