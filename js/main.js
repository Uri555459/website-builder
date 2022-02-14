
const getElement = (tagName, classNames, attributes) => {
    const element = document.createElement(tagName)

    if (classNames) {
        element.classList.add(...classNames)
    }

    if (attributes) {
        for (const attribute in attributes) {
            element[attribute] = attributes[attribute]
        }
    }

    return element
}

const createHeader = ({ header: { logo, social, menu }, title }) => {
    const header = getElement('header')
    const container = getElement('div', ['container'])
    const wrapper = getElement('div', ['header'])

    if (logo) {
        const logoItem = getElement('img', ['logo'], {
            src: logo,
            alt: 'Логотип ' + title
        })

        wrapper.append(logoItem)
    }

    if (menu) {
        const nav = getElement('nav', ['menu-list'])
        const allLink = menu.map(element => {
            const menuLink = getElement('a', ['menu-link'], {
                href: element.link,
                textContent: element.title
            })

            return menuLink
        })

        nav.append(...allLink)
        wrapper.append(nav)
    }

    if (social) {
        const socialWrap = getElement('div', ['social'])
        const allSocial = social.map(element => {
            const socialLink = getElement('a', ['social-link'], {
                href: element.link
            })
            const socialImage = getElement('img', [], {
                src: element.image,
                alt: element.title
            })

            socialLink.append(socialImage)

            return socialLink
        });

        socialWrap.append(...allSocial)
        wrapper.append(socialWrap)
    }

    const menuBtn = getElement('button', ['menu-button'])


    header.append(container)
    container.append(wrapper)
    container.append(menuBtn)

    return header
}

const createMain = ({ title, main: { genre, rating, description, trailer, trailerButtonText } }) => {

    const main = getElement('main')
    const container = getElement('div', ['container'])
    const mainContent = getElement('div', ['main-content'])
    const content = getElement('div', ['content'])

    if (genre) {
        const spanGenre = getElement('span', ['genre', 'animated', 'fadeInRight'], {
            textContent: genre
        })
        content.append(spanGenre)
    }

    if (rating) {
        const ratingWrap = getElement('div', ['rating', 'animated', 'fadeInRight'])
        const ratingStars = getElement('div', ['rating-stars'])
        const ratingNumber = getElement('div', ['rating-number'], {
            textContent: `${rating}/10`
        })

        for (let i = 0; i < 10; i++) {
            const starImg = getElement('img', ['star'], {
                alt: i ? '' : `Рейтинг ${rating} из 10`,
                src: i < rating ? './img/star.svg' : './img/star-o.svg'
            })
            ratingStars.append(starImg)
        }

        ratingWrap.append(ratingStars, ratingNumber)
        content.append(ratingWrap)
    }

    if (title) {
        const h1Title = getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
            textContent: title
        })

        content.append(h1Title)
    }

    if (description) {
        const descr = getElement('p', ['main-description', 'animated', 'fadeInRight'], {
            textContent: description
        })

        content.append(descr)
    }

    if (trailer) {
        const trailerLink = getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'], {
            textContent: trailerButtonText,
            href: trailer
        })

        const trailerLinkPlay = getElement('a', ['play', 'youtube-modal'], {
            href: trailer,
            ariaLabel: trailerButtonText
        })

        const trailerLinkPlayImage = getElement('img', ['play-img'], {
            alt: 'play',
            src: './img/play.svg',
            ariaHidden: true
        })

        trailerLinkPlay.append(trailerLinkPlayImage)
        content.append(trailerLink)
        mainContent.append(content, trailerLinkPlay)
    }

    container.append(mainContent)
    main.append(container)

    return main
}

const createSlider = ({ slider }) => {
    const series = getElement('div', ['series'])
    const swiperContainer = getElement('div', ['swiper-container'])
    const swiperWrapper = getElement('div', ['swiper-wrapper'])
    const arrowButton = getElement('button', ['arrow'])
    slider.map(element => {
        swiperWrapper.innerHTML += `
        <div class="swiper-slide">
            <figure class="card">
                <img class="card-img" src="${element.image}" alt="${element.title}">
                <figcaption class="card-description">
                <p class="card-subtitle">${element.subtitle}</p>
                <p class="card-title">${element.title}</p>
                </figcaption>
            </figure>
        </div>
        `
    })
    swiperContainer.append(swiperWrapper)
    series.append(swiperContainer, arrowButton)

    return series

}

const createFooter = ({footer: {copyright, footerMenu}}) => {
    const footer = getElement('footer', ['footer'])
    const container = getElement('div', ['container'])
    const footerContent = getElement('div', ['footer-content'])

    if (copyright) {
        const left = getElement('div', ['left'])
        const spanLeft = getElement('span', ['copyright'], {
            textContent: copyright
        })
        left.append(spanLeft)
        footerContent.append(left)
    }

    if (footerMenu) {
        const right = getElement('div', ['right'])
        const nav = getElement('nav', ['footer-menu'])

        footerMenu.map(element => {
            const navLink = getElement('a', ['footer-link'], {
                href: element.link,
                textContent: element.title
            })
            footerContent.append(navLink)
        })
    }

    container.append(footerContent)
    footer.append(container)
    return footer
}

const movieConstructor = (selector, options) => {
    const app = document.querySelector(selector)
    app.classList.add('body-app')

    app.style.backgroundImage = options.background ?
        `url("${options.background}")` : ''

    if (options.title) {
        document.title = options.title
    }

    if (options.favicon) {
        document.head.append(getElement('link', [], {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: options.favicon
        }))
    }


    if (options.header) {
        app.append(createHeader(options))
    }

    if (options.main) {
        app.append(createMain(options))
    }

    if (options.slider) {
        document.querySelector('main > .container').append(createSlider(options))
    }

    if (options.footer) {
        app.append(createFooter(options))
    }

}

movieConstructor('.app', {
    title: 'Ведьмак',
    background: './witcher/background.jpg',
    favicon: './witcher/logo.png',
    header: {
        logo: './witcher/logo.png',
        social: [
            {
                title: 'twitter',
                link: 'https://twitter.com',
                image: './witcher/social/twitter.svg'
            },
            {
                title: 'instagram',
                link: 'https://instagram.com',
                image: './witcher/social/instagram.svg'
            },
            {
                title: 'facebook',
                link: 'https://facebook.com',
                image: './witcher/social/facebook.svg'
            }
        ],
        menu: [
            {
                title: 'Описание',
                link: '#'
            },
            {
                title: 'Трейлер',
                link: '#'
            },
            {
                title: 'Отзывы',
                link: '#'
            }
        ]
    },
    main: {
        genre: '2019,фэнтези',
        rating: '8',
        description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
        trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
        trailerButtonText: 'Смотреть трейлер'
    },
    slider: [
        {
            image: './witcher/series/series-1.jpg',
            title: 'Начало конца',
            subtitle: 'Серия №1'
        },
        {
            image: './witcher/series/series-2.jpg',
            title: 'Четыре марки',
            subtitle: 'Серия №2'
        },
        {
            image: './witcher/series/series-3.jpg',
            title: 'Предательская луна',
            subtitle: 'Серия №3'
        },
        {
            image: './witcher/series/series-4.jpg',
            title: 'Банкеты, ублюдки и похороны',
            subtitle: 'Серия №4'
        },
    ],
    footer: {
        copyright: '© 2020 The Witcher. All right reserved.',
        footerMenu: [
            {
                title: 'Privacy Policy',
                link: '#'
            },
            {
                title: 'Terms of Service',
                link: '#'
            },
            {
                title: 'Legal',
                link: '#'
            },
        ]
    }
})

new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
})