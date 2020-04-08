let lst = {
    "Махачкала": ["Россия", 532096, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Makhachkala_%28Dagestan%29.svg/240px-Flag_of_Makhachkala_%28Dagestan%29.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Montage-of-Makhachkala-%282016%29.png/800px-Montage-of-Makhachkala-%282016%29.png"],
    "Киев": ["Украина", 703448, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_Kyiv_Kurovskyi.svg/240px-Flag_of_Kyiv_Kurovskyi.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Kyiv_Montage_2016.png/800px-Kyiv_Montage_2016.png"],
    "Лондон": ["Великобритания", 2643743, "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/City_hall_London_at_dawn_%28cropped%29.jpg/200px-City_hall_London_at_dawn_%28cropped%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/London_Montage_2016.png/435px-London_Montage_2016.png"],
    "Вашингтон": ["США", 4266586, "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_the_District_of_Columbia.svg/100px-Flag_of_the_District_of_Columbia.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Washington_Montage_2016.png/800px-Washington_Montage_2016.png"],
    "Москва": ["Россия", 524894, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Moscow%2C_Russia.svg/263px-Flag_of_Moscow%2C_Russia.svg.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/MSK_Collage_2015.png/800px-MSK_Collage_2015.png"]
}

const mydiv = name => document.querySelector(name);
const mydivs = name => document.querySelectorAll(name);

const img = (path) => {
    return `<img src="${path}">`;
}

function myfetch(id, name) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=721ff8db0fc635e641f49869ed9fce47`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            mydiv('.out').innerHTML = img(lst[name][3]);
            mydivs('.section')[0].innerHTML = img(lst[name][2]);
            mydivs('.section')[1].textContent = data["sys"]["country"];
            mydivs('.section')[2].textContent = data["name"];
            mydivs('.section')[3].innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            mydivs('.section')[4].innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
            mydivs('.section')[5].textContent = `${data["wind"]['speed']} speed`;
        });
}

let arr = document.querySelectorAll('.mybutton');

myfetch(lst["Махачкала"][1], "Махачкала"); // по умолчанию

for (let i = 0; i < arr.length; i++) {
    arr[i].onclick = () => {
        let expr = arr[i].textContent
        switch (expr) {
            case "Махачкала":
                myfetch(lst["Махачкала"][1], "Махачкала");
                break;
            case "Киев":
                myfetch(lst["Киев"][1], "Киев");
                break;
            case "Москва":
                myfetch(lst["Москва"][1], "Москва");
                break;
            case "Лондон":
                myfetch(lst["Лондон"][1], "Лондон");
                break;
            case "Вашингтон":
                myfetch(lst["Вашингтон"][1], "Вашингтон");
                break;
            default:
                myfetch(lst["Махачкала"][1]);
        }
    }
}

