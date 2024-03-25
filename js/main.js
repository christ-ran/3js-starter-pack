import * as THREE from "three";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

const width = window.innerWidth;
const height = window.innerHeight;
const pixelRatio = window.devicePixelRatio;
const ratio = width / height;

class WebGL {
    perspective = 1000;
    uniforms = { u_time: { value: 0 } };

    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
    }

    setup() {
        this.camera = new THREE.PerspectiveCamera(75, ratio);
        this.camera.position.set(0, 0, 1);

        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(pixelRatio);
        this.canvas.appendChild(this.renderer.domElement);
    }

    createMesh() {
        const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);
        const material = new THREE.ShaderMaterial({ 
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
        });

        this.mesh = new THREE.Mesh(planeGeometry, material);
        this.scene.add(this.mesh);
    }

    animate() {

    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.animate();
    }
}

const canvas = document.body;

const webGL = new WebGL(canvas);
webGL.setup();
webGL.createMesh();
webGL.render();