/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-toggle-right'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-toggle-left' : 'bx-toggle-right'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-toggle-left' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '30px',
    duration: 1800,
    reset: true,
});

sr.reveal(`.home__data, .home__img, 
           .decoration__data,
           .accessory__content,
           .footer__content`, {
    origin: 'top',
    interval: 200,
})

sr.reveal(`.share__img, .send__content`, {
    origin: 'left'
})

sr.reveal(`.share__data, .send__img`, {
    origin: 'right'
})


/*==================== App Link Click ====================*/
function trackAccessoryClick(event) {
    event.preventDefault(); // 阻止链接的默认行为
    var url = this.getAttribute('href');
    var label = this.closest('.accessory__content').querySelector('.accessory__title').innerText; // 获取游戏名称

    gtag('event', 'click', {
        'event_category': 'Like Icon Clicks',
        'event_label': label,
        'transport_type': 'beacon',
        'event_callback': function() {
            document.location = url;
        }
    });
}

var accessoryLinks = document.querySelectorAll('.accessory__button');
accessoryLinks.forEach(function(link) {
    link.addEventListener('click', trackAccessoryClick);
});

/*==================== Group Link Click ====================*/

function trackFacebookLinkClick(event) {
    // 阻止链接的默认行为
    event.preventDefault(); 

    var url = this.getAttribute('href');

    gtag('event', 'click', {
        'event_category': 'External Link Clicks',
        'event_label': 'Facebook Group Link Clicked',
        'transport_type': 'beacon',
        'event_callback': function() {
            document.location = url;
        }
    });
}

// 选择特定的链接并添加事件监听器
var facebookLink = document.querySelector('.nav__logo[href="https://www.facebook.com/groups/vitastudio"]');
facebookLink.addEventListener('click', trackFacebookLinkClick);


/*==================== SHARE LINK ====================*/
document.getElementById('shareButton').addEventListener('click', function() {
    if (navigator.clipboard && window.isSecureContext) {
        // 使用现代的Clipboard API
        navigator.clipboard.writeText("https://penguingpt.github.io/Xmas.github.io/")
            .then(function() {
                alert("Link Copied, Share With Others!");
                // 向谷歌分析发送事件
                gtag('event', 'share', {
                    'event_category': 'Share Button Clicks',
                    'event_label': 'Share Link Copied'
                });
            })
            .catch(function(err) {
                console.error('Could not copy text: ', err);
            });
    } else {
        // 备用方案：显示一个文本输入框供用户手动复制
        var textArea = document.createElement("textarea");
        textArea.value = "https://penguingpt.github.io/Xmas.github.io/";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
            alert("Link Copied");
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
});

/*==================== ICONS CLICK TRACK ====================*/

function sendAnalyticsEvent(eventName) {
    gtag('event', eventName, {
        'event_category': 'App Icon Clicks',
        'event_label': eventName
    });
}


/*==================== DOWNLAOD A IMAGE ====================*/

// 假设 assets/img 目录下有以下文件
const files = ['Family.png','FairyDeer.png','Island.png','Farm.png',
               'Cabin.png','Sakura.png','Forest.png','Harvest.png','Fishing.png','Dog.png'];

document.getElementById('downloadButton').addEventListener('click', function() {
    // 从数组中随机选择一个文件
    const randomFile = files[Math.floor(Math.random() * files.length)];

    // 更新下载链接的 href 属性
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.setAttribute('href', `assets/gift/${randomFile}`);

    // 触发下载
    downloadLink.click();
});

/*==================== Download Track ====================*/

document.getElementById('downloadButton').addEventListener('click', function() {
        // 触发下载
        document.getElementById('downloadLink').click();

        // 向谷歌分析发送事件
        gtag('event', 'download', {
            'event_category': 'Download Button Clicks',
            'event_label': 'Holiday Gift Downloaded'
        });
    });

/*==================== AUDIO PLAY ====================*/

document.getElementById('scrollDownButton').addEventListener('click', function() {
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.play(); // 播放音频

});



/*==================== PICK A KEYWORD BUTTON INTERACTION ====================*/

document.addEventListener('DOMContentLoaded', () => {
    const KeywordButton = document.getElementById('KeywordButton');

    KeywordButton.addEventListener('click', function(e) {
        e.preventDefault(); // 防止链接默认行为

        // 定义关键词列表
        const keywords = ['Relaxation','Fun','Joy','Vita','Resilience','Wisdom',
                          'Harmony','Mindfulness','Gratitude','Health','Serenity','Fulfillment','Creativity','Empowerment','Peace','Inspiration','Strength','Bless','Balance','Compassion'];

        // 随机选择一个关键词
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

        // 更新按钮文本
        this.textContent = randomKeyword;

        // 禁用按钮，防止再次点击
        this.disabled = true;
    });
});
