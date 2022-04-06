//mi version de plantilla jajaja
const template = (user) => {
  return `<ul>
			<li>${user.name}</li>
			<li>${user.lastname}</li>
			<li>${user.email}</li>
			<li>${user.Age}</li>
		</ul>`;
};

const user = {
  name: "Juan",
  lastname: "Perez",
  email: "test@gmail.com",
  Age: "23",
};

document.getElementById("data").innerHTML = template(user);
