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
                'Nuxt.js',
            ]
        }
    }
    componentDidMount() {
      const ticker = document.querySelector('.ticker');
      const list = document.querySelector('.ticker__list');
      const clone = list.cloneNode(true);

      ticker.append(clone);
    }
    render() {
        return (
            <div class="h-28 flex flex-row">
                <div class="column-blur relative left-0 w-1/3 bg-gradient-to-r from-white from-90% z-10"></div>

                    {/* Ticker */}
                    <div className="ticker flex justify-center items-center h-12 bg-white mx-auto w-1/3">
                        <div className="ticker__list flex relative left-[55%] mt-16">
                            {this.state.ticker.map((item, index) => (
                                <div className="ticker__item font-bold whitespace-nowrap mr-12 text-2xl text-[#07042f]" key={index}>{item}</div>
                            ))}
                        </div>
                    </div>

                <div class="column-blur relative right-0 w-1/3 bg-gradient-to-l from-white from-90% z-10"></div>
	        </div>
        )
    }
}

export default Ticker