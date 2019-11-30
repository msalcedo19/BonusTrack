import React from 'react';
import * as d3 from 'd3';

export default class bonusTrack extends React.Component {
    state = {
        width: 1500,
        height: 1200,
        y:80,
        nodos: [{}],
        svg: undefined,
        indexNewNode: 0
    };

    componentDidMount() {
        this.drawCanvas()
    }

    drawTree() {

        let nodos = this.state.nodos;
        let svg = this.state.svg;
        let yRaiz = this.state.y;

        //Configuración de lineas
        let bordex1 = 10;
        let bordex2 = 300 ;
        let bordey1 = 13;
        let bordey2 = 203;

        //Configuración de Nodos
        let posx = 300;  //Resta cuando es menor el nodo
        let posy = 197; //Siempre suma

        if(this.state.indexNewNode >= 4 && this.state.indexNewNode<8){
            bordex2 = 150; //Resta cuando es menor el nodo
            //bordey2 = 200; //Siempre suma
            posx = 150; //Resta cuando es menor el nodo
            //posy = 192; //Siempre suma
        }
        else if(this.state.indexNewNode >= 8 && this.state.indexNewNode<15){
            bordex2 = 85; //Resta cuando es menor el nodo
            //bordey2 = 200; //Siempre suma
            posx = 85; //Resta cuando es menor el nodo
            //posy = 192; //Siempre suma
        }
        else if(this.state.indexNewNode >= 15 && this.state.indexNewNode < 31 ){
            bordex2 = 48; //Resta cuando es menor el nodo
            //bordey2 = 200; //Siempre suma
            posx = 40; //Resta cuando es menor el nodo
            //posy = 192; //Siempre suma
        }
        else if(this.state.indexNewNode >= 31 ){
            bordex2 = 40; //Resta cuando es menor el nodo
            //bordey2 = 200; //Siempre suma
            posx = 30; //Resta cuando es menor el nodo
            //posy = 192; //Siempre suma
        }

        if(this.state.indexNewNode === 1) {
            let nodo = nodos[this.state.indexNewNode];
            let raiz = svg.append("circle")
                .attr("cx", nodo.x)
                .attr("cy", nodo.y)
                .attr("r", nodo.r)
                .attr("fill", "yellow")
                .attr("stroke", "black")
                .attr("stroke-width", "2");
            nodo.y = yRaiz;
            raiz
                .transition()
                .attr("cy", nodo.y)
                .delay(500)
                .duration(2000)
                .on("end", function () {
                    svg.append("text")
                        .attr("x", nodo.x-6)
                        .attr("y", nodo.y+4)
                        .attr("font-size", 11)
                        .text(nodo.value)
                        .attr("fill", "blue")
                        .attr("font-weight",700);
                    d3.select(this)
                        .transition()
                        .attr("fill", "black")
                });
        }
        else{
            let childIndex = this.state.indexNewNode;
            let childNode = nodos[childIndex];
            let parentNode = nodos[1];
            if(childIndex%2===0)
                parentNode = nodos[childIndex/2];
            else
                parentNode = nodos[(childIndex-1)/2];
            if (parseInt(childNode.value) < parseInt(parentNode.value)) {
                svg.append("circle")
                    .transition()
                    .attr("cx", childNode.x)
                    .attr("cy", childNode.y)
                    .attr("r", childNode.r)
                    .attr("fill", "yellow")
                    .on("end", function () {
                        childNode.y = yRaiz;
                        d3.select(this)
                            .transition()
                            .attr("cy", childNode.y)
                            .delay(500)
                            .duration(2000)
                            .on("end", function () {
                                svg.append("line")
                                    .attr("x1", parentNode.x - bordex1)
                                    .attr("y1", parentNode.y + bordey1)
                                    .attr("x2", parentNode.x - bordex2 + 10)
                                    .attr("y2", parentNode.y + bordey2 - 18)
                                    .attr("stroke", "black")
                                    .attr("stroke-width", "2");
                                childNode.x = parentNode.x - posx;
                                childNode.y = parentNode.y + posy;
                                d3.select(this)
                                    .attr("cx", childNode.x)
                                    .attr("cy", childNode.y)
                                    .attr("fill", "red")
                                    .attr("stroke", "black")
                                    .attr("stroke-width", "2");
                                svg.append("text")
                                    .attr("x", childNode.x-6)
                                    .attr("y", childNode.y+4)
                                    .attr("font-size", 11)
                                    .text(childNode.value)
                                    .attr("fill", "blue")
                                    .attr("font-weight",700);
                            });
                    });
            } else if (parseInt(childNode.value) >= parseInt(parentNode.value)) {
                svg.append("circle")
                    .transition()
                    .attr("cx", childNode.x)
                    .attr("cy", childNode.y)
                    .attr("r", childNode.r)
                    .attr("fill", "yellow")
                    .on("end", function () {
                        childNode.y = yRaiz;
                        d3.select(this)
                            .transition()
                            .attr("cy", childNode.y)
                            .delay(500)
                            .duration(2000)
                            .on("end", function () {
                                svg.append("line")
                                    .attr("x1", parentNode.x + bordex1)
                                    .attr("y1", parentNode.y + bordey1)
                                    .attr("x2", parentNode.x + bordex2 - 10)
                                    .attr("y2", parentNode.y + bordey2 - 18)
                                    .attr("stroke", "black")
                                    .attr("stroke-width", "2");
                                childNode.x = parentNode.x + posx;
                                childNode.y = parentNode.y + posy;
                                d3.select(this)
                                    .attr("cx", childNode.x)
                                    .attr("cy", childNode.y)
                                    .attr("fill", "red")
                                    .attr("stroke", "black")
                                    .attr("stroke-width", "2");
                                svg.append("text")
                                    .attr("x", childNode.x-6)
                                    .attr("y", childNode.y+4)
                                    .attr("font-size", 11)
                                    .text(childNode.value)
                                    .attr("fill", "blue")
                                    .attr("font-weight",700);
                            });
                    });
            }
        }

    }

    addNodoRaiz(){
        let arrNodes = this.state.nodos;
        arrNodes.push({x:this.state.width/2, y: -20, r:15, value:document.getElementById("value").value});
        document.getElementById("value").value = "";
        let i = 0;
        while (i<60){
            arrNodes.push("x");
            i += 1;
        }
        this.setState({
            nodos: arrNodes,
            indexNewNode: 1
        }, () => this.drawTree())
    }

    addNodo(){
        let newNode={x:this.state.width/2, y: -20, r:15, value:document.getElementById("value").value};
        document.getElementById("value").value = "";
        if(this.state.nodos.length <= 64){
            let arrNodes = this.state.nodos;
            let añadio = false;
            let index = 1;
            while(!añadio){
                let parentNode = arrNodes[index];
                if(parseInt(parentNode.value)>parseInt(newNode.value) && arrNodes[index*2]==="x"){
                    arrNodes[index*2] = newNode;
                    añadio = true;
                    index = index*2;
                }
                else if (parseInt(parentNode.value)>parseInt(newNode.value) && arrNodes[index*2]!=="x"){
                    index = index*2
                }
                else if(parseInt(parentNode.value)<=parseInt(newNode.value) && arrNodes[index*2+1]==="x"){
                    arrNodes[index*2+1] = newNode;
                    añadio = true;
                    index = index*2+1;
                }
                else if(parseInt(parentNode.value)<=parseInt(newNode.value) && arrNodes[index*2+1]!=="x"){
                    index = index*2+1;
                }
            }
            this.setState({
                nodos: arrNodes,
                indexNewNode: index
            }, () => this.drawTree())
        }
    }

    drawCanvas() {
        //const margin = {top: 10, left: 100, bottom: 40, right: 10};
        //const iwidth = width - margin.left - margin.right;
        //const iheight = height - margin.top - margin.bottom;

        let svg = d3.select(this.refs.canvas).append("svg");
        this.setState({
            svg: svg
        });
        svg.attr("width", this.state.width);
        svg.attr("height", this.state.height);

        d3.select("#start").on("click", () =>  {
            if(this.state.nodos.length === 1)
                this.addNodoRaiz();
            else
                this.addNodo();
        });
    }

    render() {
        return (
            <div ref="canvas">

            </div>
        );
    }
}
