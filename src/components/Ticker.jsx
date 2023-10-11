import React from 'react';

class Ticker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: [
                'JavaScript',
                'PHP',
                'React.js',
                'Vue.js',
                'Symfony',
                'Tailwindcss',
                'Flutter',
                'Nuxt.js'
            ]
        }
    }
    componentDidMount() {
      // call api or anything
      const ticker = document.querySelector('.ticker');
      const list = document.querySelector('.ticker__list');
      const clone = list.cloneNode(true);

      ticker.append(clone)
      console.log('componentDidMount')
    }
    render() {
        return (
            <div className="ticker">
                <div className="ticker__list">
                    {this.state.ticker.map((item, index) => (
                        <div className="ticker__item" key={index}>{item}</div>
                    ))}
                </div>
            </div>
        )
    }
}

// const ticker = () => {
//     // TODO : variable a null 
//     // const ticker = document.querySelector('.ticker');
//     // const list = document.querySelector('.ticker__list');
//     // const clone = list.cloneNode(true);

// // ticker.append(clone)
//   return (
//     // <div class="ticker-wrap">
//         // <div class="ticker">
//         //     <div class="ticker__item">JavaScript</div>
//         //     <div class="ticker__item">PHP</div>
//         //     <div class="ticker__item">React.js</div>
//         //     <div class="ticker__item">Vue.js</div>
//         //     <div class="ticker__item">Symfony</div>
//         //     <div class="ticker__item">Tailwindcss</div>
//         //     <div class="ticker__item">Flutter</div>
//         //     <div class="ticker__item">Nuxt.js</div>
//         // </div> 
//     // </div> 
//     <div class="ticker">
//         <div class="ticker__list">
//             <div class="ticker__item">JavaScript</div>
//             <div class="ticker__item">PHP</div>
//             <div class="ticker__item">React.js</div>
//             <div class="ticker__item">Vue.js</div>
//             <div class="ticker__item">Symfony</div>
//             <div class="ticker__item">Tailwindcss</div>
//             <div class="ticker__item">Flutter</div>
//             <div class="ticker__item">Nuxt.js</div>
            
//         </div>
//     </div>
//   )
// }

export default Ticker