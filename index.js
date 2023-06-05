const url = "https://api.github.com/users";

const profileContainer = document.getElementById("profileContainer");
const loading = document.getElementById("loading");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");



const generateProfile = (profile) => {
  return `
  <div class="profile_box">
          <div class="top_section">
            <div class="left">
              <img
                alt="avatar"
                src="${profile.avatar_url}"
              />
              
              <div class="self">
                <h2>${profile.name}</h2>
                <h2>@${profile.login}</h2>
              </div>
            </div>

            <a class="right" href="${profile.html_url}" target="_black">
              <button class="primary_btn">Check Profile</button>
            </a>
          </div>

          <div class="about">
            <h2>About</h2>
            <p>${profile.bio}</p>
          </div>

          <div class="status">
            <div class="status-item">
              <h3>Followers</h3>
              <p>${profile.followers}</p>
            </div>
            <div class="status-item">
              <h3>Followings</h3>
              <p>${profile.following}</p>
            </div>
            <div class="status-item">
              <h3>Repos</h3>
              <p>${profile.public_repos}</p>
            </div>
          </div>
        </div>
    `;
};
const fetchProfile = async () => {
  const username = searchInput.value;

  loading.innerText = "loading.....";
  loading.style.color = "black";

  try {
    console.log("hey");
    const res = await fetch(`${url}/${username}`);
    const data = await res.json();
    if (data.login) {
      loading.innerText = "";
      profileContainer.innerHTML = generateProfile(data);
    } else {
      loading.innerHTML = data.message;
      loading.style.color = "red";
      profileContainer.innerText = "";
    }

    console.log("data", data);
  } catch (error) {
    console.log({ error });
    loadingEl.innerText = "api not worked";
  }
};

searchBtn.addEventListener("click", fetchProfile);
