window.onload = () => {
  let socket = io();
  let me = (message, nickname) => {
    return `<div class="message me"><div class="nick">${nickname}</div>${message}</div>`;
  };
  let others = (message, nickname) => {
    return `<div class="message"><div class="nick">${nickname}</div>${message}</div>`;
  };
  let usersOnline = document.getElementById("usersOnline");
  let chatBody = document.getElementById("chat");
  let chatInput = document.getElementById("chatInput");
  let user;

  chatInput.focus();
  const inputNickname = () => {
    Swal.fire({
      title: "Ingrese su nick",
      input: "text",
      allowOutsideClick: false,
      inputAttributes: {
        autocapitalize: "off",
      },
      inputValidator: (value) => {
        if (!value) {
          return "Por favor ingrese su nick";
        } else {
          if (value.trim().length < 3 || value.trim().length > 10) {
            return "Ingrese un nick valido entre 3 y 10 caracteres";
          }
        }
      },
    }).then((result) => {
      if (result) {
        user = result.value;
        socket.emit("newUser", user);
        console.log(user);
        return Swal.fire("Saved!", "", "success");
      }

      Swal.fire("Changes are not saved", "", "Error");
    });
  };
  inputNickname();

  chatInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      if (chatInput.value.trim().length > 0) {
        let message = chatInput.value.trim();
        console.log(message);
        socket.emit("chatMessageFromBrowser", {
          message,
          user,
        });
        chatInput.value = "";
      }
    }
  });

  socket.on("chatMessageFromServer", (data) => {
    if (data.user.length > 10 || data.user.length < 3) return inputNickname();
    let message = data.msg;
    let userRes = data.user;
    let html = `${
      user === userRes ? me(message, userRes) : others(message, userRes)
    }`;
    chatBody.innerHTML += html;
    usersOnline.innerHTML = data.ononline;
    chatBody.scrollTop = chatBody.scrollHeight;
  });

  socket.on("newUser", (data) => {
    //console.log(data.users);
    let html = `<div class="message">${data.users} se ha unido al chat</div>`;
    chatBody.innerHTML += html;
    //usersOnline.innerHTML = data.ononline;
    chatBody.scrollTop = chatBody.scrollHeight;
  });
};
