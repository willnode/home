/* Graphics */
graphics = {
    images: [{
        image: "https://res.cloudinary.com/wellosoft/image/upload/v1516086014/home/interactive-tothehighestplace.jpg",
        title: "To the Highest Place",
        desc: "Rule #1 is Move Higher",
        url: "https://willnode.itch.io/tthp"
    }, {
        image: "https://res.cloudinary.com/wellosoft/image/upload/v1516085765/home/library-simpleproceduralskybox.jpg",
        title: "Simple Procedural Skybox",
        desc: "Procedural Skybox with features",
        url: 'http://u3d.as/fCV'
    }, {
        image: "https://res.cloudinary.com/wellosoft/image/upload/v1516085765/home/library-texdraw.jpg",
        title: "TEXDraw",
        desc: "Expressing math syntax made easy",
        url: 'http://u3d.as/mFe'
    }, {
        image: "https://res.cloudinary.com/wellosoft/image/upload/v1516170774/home/Med_2.png",
        title: "Engine4",
        desc: "Turn the game to one dimension higher",
        url: "http://u3d.as/fdm"
    }],
    bg: (() => document.getElementById('graphics'))(),
    idx: 0,
    setg: function (delta) {
        const length = 4;

        var g = graphics.bg;
        var idx = graphics.idx;
        g.style.filter = 'brightness(0)';

        idx += delta;
        if (idx >= length)
            idx = 0;
        else if (idx < 0)
            idx = length - 1;

        setTimeout(() => {
            g.style.filter = ''; var i = graphics.images[graphics.idx = idx];
            g.style.background = 'url(' + i.image + ')';
            document.getElementById('graphics-link').setAttribute('href', i.url);
            document.getElementById('graphics-link').textContent = i.title + "  ↗";
            document.getElementById('graphics-desc').textContent = i.desc;
        }, 500);
    }
}

if (graphics.bg)
    graphics.setg(0);

/* Repos */
(function () {
    getForeground = function (bgColor) {
        /* https://stackoverflow.com/a/41491220/3908409 */
        var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        var r = parseInt(color.substring(0, 2), 16);
        var g = parseInt(color.substring(2, 4), 16);
        var b = parseInt(color.substring(4, 6), 16);
        return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
            '#000' : '#fff';
    };
    setMessage = function (txt) {
        document.getElementById('repos-stat').textContent = txt;
    };
    setMessage('Be patient. Our 🐒 still scraping the web for you...');
    var repos = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://gh-latest-repos-mhqyelmowl.now.sh", true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                repos = JSON.parse(xhr.responseText);
                repos.reverse();
                setMessage(repos.length === 0 ? 'Whoops. Nothing here. But we still 💖 U' : '');
                if (repos.length > 0) {
                    var result = '';
                    repos.forEach(r => {
                        result += `
<li>
    <a href='${r.url}'>
        <span class="repo">
            <span class="name">${r.name}</span>
            <span class="lang" style="background-color: ${r.primaryLanguage.color}; color:${getForeground(r.primaryLanguage.color)}">${r.primaryLanguage.name}</span>
        </span><br>
        <span class="desc">${r.description}</span>
        <div>${r.stargazers ? ('⭐ ' + r.stargazers) : ''}</div>
    </a>
</li>`;
                    });
                    document.getElementById('repos').innerHTML = result;
                }
            } else {
                setMessage(xhr.status + ": Sorry our monkeys have failed load your request 🤔");
            }
        }
    }
    xhr.send();
})();
