import * as THREE from "three";
import { getFOV } from "./helper";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

const g_width = window.innerWidth;
const g_height = window.innerHeight;
const g_pixelRatio = window.devicePixelRatio;
const g_ratio = g_width / g_height;

class WebGL {
    _perspective = 1000;

    constructor(canvas) {
        this.canvas = canvas;
    }

    setup() {
        this.scene = new THREE.Scene();

        const fov = getFOV(g_height, this._perspective);
        this.camera = new THREE.PerspectiveCamera(fov, g_ratio, 0.1, this._perspective);
        this.camera.position.set(0, 0, this._perspective);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(g_width, g_height);
        this.renderer.setPixelRatio(g_pixelRatio);

        this.canvas.appendChild(this.renderer.domElement);
    }

    createMesh() {
        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

        this.mesh = new THREE.Mesh(planeGeometry, material);
        this.scene.add(this.mesh);
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

const canvas = document.body;

const webGL = new WebGL(canvas);
webGL.setup();
webGL.createMesh();
webGL.render();