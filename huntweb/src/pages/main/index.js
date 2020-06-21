import React, { Componente, Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

//Stateful
export default class Main extends Component {
    state = {
        products: [],
        producInfo: {},
        page: 1,
    }

    componentDidMount() {
        this.loadProducst();
    }

    loadProducst = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productInfo } = response.data;

        this.setState({ products: docs, productInfo, page});
    }

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducst(pageNumber);
    }

    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;
        this.loadProducst(pageNumber);
    }

    render() {
        //return <h1>Contagem de produtos: { this.state.products.length }</h1>;

        const { products, page, producInfo } = this.state;

        return (
            <div className="product-list">
                { products.map(product => (
                    //<h2 key={ product._id }> { product.title } </h2>
                    <article key={ product._id }>
                    <strong>{ product.title }</strong>
                    <p>{ product.description }</p>
                    <Link to={`/products/${product._id}`}>Acessar</Link>
                </article>
                ))}

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === producInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}