import * as THREE from "three";
import GUI from "lil-gui";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const g_width = window.innerWidth;
const g_height = window.innerHeight;
const g_pixelRatio = window.devicePixelRatio;
const g_ratio = g_width / g_height;
const g_uniforms = {
    u_time: { value: 0 }
};
const g_settings = {};

class WebGL {
    perspective = 1000;
    uniforms = g_uniforms;
    settings = g_settings;

    constructor(canvas) {
        this.canvas = canvas;

        this.gui = new GUI();
        this.scene = new THREE.Scene();
    }

    setup() {
        this.camera = new THREE.PerspectiveCamera(75, g_ratio);
        this.camera.position.set(0, 0, 1);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(g_width, g_height);
        this.renderer.setPixelRatio(g_pixelRatio);
        this.canvas.appendChild(this.renderer.domElement);

        this.setupExtension();
    }

    setupExtension() {
        this.control = new OrbitControls(this.camera, this.renderer.domElement);
    }

    createMesh() {
        const sphereGeometry = new THREE.PlaneGeometry(1, 1, 100, 100);
        const material = new THREE.ShaderMaterial({ 
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
        });

        this.mesh = new THREE.Mesh(sphereGeometry, material);
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