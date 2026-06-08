const chatCard = document.querySelector("#chatCard");
    const chatPreview = document.querySelector("#chatPreview");
    const realChatWrapper = document.querySelector("#realChatWrapper");
    const webChatContainer = document.querySelector("#WebChatContainer");

    function abrirChatVisual() {
      chatCard.classList.add("chat-open");
      chatPreview.classList.add("preview-hidden");
      realChatWrapper.classList.add("chat-visible");

      setTimeout(() => {
        if (window.astroNetChat && window.astroNetChat.openWindow) {
          window.astroNetChat.openWindow();
        }
      }, 500);
    }

    window.watsonAssistantChatOptions = {
      integrationID: "ca4e23c4-560b-44ad-9a88-879cda21394a",
      region: "https://integrations.us-east.assistant.watson.appdomain.cloud",
      serviceInstanceID: "9828f693-1c1e-4c36-8595-b72ceab7acc4",

      element: webChatContainer,

      onLoad: async (instance) => {
        await instance.render();

        window.astroNetChat = instance;

        const botoesAbrirChat = document.querySelectorAll("[data-open-chat]");

        botoesAbrirChat.forEach((botao) => {
          botao.addEventListener("click", function (event) {
            event.preventDefault();
            abrirChatVisual();
          });
        });
      }
    };

    setTimeout(function () {
      const t = document.createElement("script");

      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";

      document.head.appendChild(t);
    });