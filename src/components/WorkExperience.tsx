import { useEffect, useRef, useState } from 'react';
import type { SelfieSegmentation as SelfieSegmentationClass } from '@mediapipe/selfie_segmentation';
import segmentationLibrary from '@mediapipe/selfie_segmentation/selfie_segmentation.js?url';
import segmentationGraph from '@mediapipe/selfie_segmentation/selfie_segmentation.binarypb?url';
import segmentationModel from '@mediapipe/selfie_segmentation/selfie_segmentation.tflite?url';
import segmentationLandscapeModel from '@mediapipe/selfie_segmentation/selfie_segmentation_landscape.tflite?url';
import segmentationWasm from '@mediapipe/selfie_segmentation/selfie_segmentation_solution_wasm_bin.js?url';
import segmentationWasmData from '@mediapipe/selfie_segmentation/selfie_segmentation_solution_simd_wasm_bin.data?url';
import segmentationWasmBinary from '@mediapipe/selfie_segmentation/selfie_segmentation_solution_wasm_bin.wasm?url';
import segmentationSimdWasm from '@mediapipe/selfie_segmentation/selfie_segmentation_solution_simd_wasm_bin.js?url';
import segmentationSimdWasmBinary from '@mediapipe/selfie_segmentation/selfie_segmentation_solution_simd_wasm_bin.wasm?url';
import Icon from './Icon';
import workExperienceVideo from '../assets/chehan-video.mp4';
import '../styles/WorkExperience.css';

declare global {
	interface Window {
		SelfieSegmentation: typeof SelfieSegmentationClass;
	}
}

const segmentationAssets: Record<string, string> = {
	'selfie_segmentation.binarypb': segmentationGraph,
	'selfie_segmentation.tflite': segmentationModel,
	'selfie_segmentation_landscape.tflite': segmentationLandscapeModel,
	'selfie_segmentation_solution_wasm_bin.js': segmentationWasm,
	'selfie_segmentation_solution_wasm_bin.wasm': segmentationWasmBinary,
	'selfie_segmentation_solution_simd_wasm_bin.js': segmentationSimdWasm,
	'selfie_segmentation_solution_simd_wasm_bin.wasm': segmentationSimdWasmBinary,
	'selfie_segmentation_solution_simd_wasm_bin.data': segmentationWasmData,
};

let segmentationLibraryPromise: Promise<void> | undefined;

function loadSegmentationLibrary() {
	if (window.SelfieSegmentation) return Promise.resolve();
	segmentationLibraryPromise ??= new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = segmentationLibrary;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error('Unable to load the video segmentation library.'));
		document.head.appendChild(script);
	});
	return segmentationLibraryPromise;
}

type WorkExperienceProps = {
	replayToken: number;
};

export default function WorkExperience({ replayToken }: WorkExperienceProps) {
	const [workModalOpen, setWorkModalOpen] = useState(false);
	const [segmentationReady, setSegmentationReady] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isCompactViewport, setIsCompactViewport] = useState(() =>
		typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches,
	);
	const [introPlaying, setIntroPlaying] = useState(() =>
		typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches,
	);
	const updateVideoAspectRatio = (video: HTMLVideoElement) => {
		if (video.videoWidth && video.videoHeight) {
			video.parentElement?.style.setProperty('--video-aspect-ratio', `${video.videoWidth} / ${video.videoHeight}`);
		}
	};

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 900px)');
		const updateViewport = () => setIsCompactViewport(mediaQuery.matches);
		mediaQuery.addEventListener('change', updateViewport);
		return () => mediaQuery.removeEventListener('change', updateViewport);
	}, []);

	useEffect(() => {
		setIntroPlaying(isCompactViewport);
		setWorkModalOpen(false);
	}, [isCompactViewport, replayToken]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');
		if (!canvas || !context) return;

		let disposed = false;
		let processing = false;
		let lastVideoTime = -1;
		let animationFrame = 0;
		let segmenter: InstanceType<typeof SelfieSegmentationClass> | undefined;

		const processFrame = () => {
			const video = videoRef.current;
			if (video) updateVideoAspectRatio(video);
			if (
				segmenter &&
				video &&
				video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
				video.currentTime !== lastVideoTime &&
				!processing
			) {
				lastVideoTime = video.currentTime;
				processing = true;
				void segmenter.send({ image: video }).catch(() => {
					if (!disposed) setSegmentationReady(false);
				}).finally(() => {
					processing = false;
				});
			}
			if (!disposed) animationFrame = requestAnimationFrame(processFrame);
		};

		void loadSegmentationLibrary().then(async () => {
			if (disposed) return;
			segmenter = new window.SelfieSegmentation({
				locateFile: (path) => segmentationAssets[path.split('/').pop() ?? path] ?? path,
			});
			segmenter.setOptions({ modelSelection: 0 });
			segmenter.onResults(({ image, segmentationMask }) => {
				if (disposed) return;
				if (canvas.width !== image.width || canvas.height !== image.height) {
					canvas.width = image.width;
					canvas.height = image.height;
				}
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(image, 0, 0, canvas.width, canvas.height);
				context.globalCompositeOperation = 'destination-in';
				context.filter = 'blur(1.5px)';
				context.drawImage(segmentationMask, 0, 0, canvas.width, canvas.height);
				context.filter = 'none';
				context.globalCompositeOperation = 'source-over';
				setSegmentationReady(true);
			});
			await segmenter.initialize();
			if (!disposed) processFrame();
		}).catch(() => {
			if (!disposed) setSegmentationReady(false);
		});

		return () => {
			disposed = true;
			cancelAnimationFrame(animationFrame);
			if (segmenter) void segmenter.close();
		};
	}, []);

	return (
		<section id="work" className={`detail-section hero-section${isCompactViewport && introPlaying ? ' work-intro-only' : ''}`}>
			<div className="section-shell">
				<div className="split">
					{(!isCompactViewport || !introPlaying) && <div className="split-body">

						<h1 className="section-heading hero-heading">Work <span className="gradient-text">Experience</span></h1>
						<p className="section-intro">
							Gain valuable industry experience, working on real-world projects
							and developing practical skills in a professional environment.
						</p>

						<div className="info-card work-card">
							<div className="card-icon"><Icon name="work" /></div>
							<div className="card-content">
								<div className="card-title-row">
									<div>
										<div className="card-title">Software Engineering Intern</div>
										<div className="card-sub">HotCat Technologies (Pvt) Ltd</div>
									</div>
									<span className="badge">06 Months</span>
								</div>

								<div className="card-meta">
									<span><Icon name="calendar" /> Feb 2026 – Aug 2026</span>
									<span><Icon name="home" /> Hybrid</span>
									<span><Icon name="location" /> Wadduwa, Sri Lanka</span>
								</div>

								<button className="btn-outline" onClick={() => setWorkModalOpen(true)}>
									<span>View More</span><Icon name="arrow" />
								</button>
							</div>
						</div>
					</div>}

					{(!isCompactViewport || introPlaying) && (
						<div className={`split-media portrait-media${segmentationReady ? ' segmentation-ready' : ''}`}>
							<video
								ref={videoRef}
								key={isCompactViewport ? replayToken : 'desktop'}
								src={workExperienceVideo}
								autoPlay={!isCompactViewport || introPlaying}
								loop={!isCompactViewport}
								muted
								playsInline
								preload="metadata"
								aria-label="Chehan's work experience video"
								onLoadedMetadata={(event) => updateVideoAspectRatio(event.currentTarget)}
								onEnded={isCompactViewport ? () => setIntroPlaying(false) : undefined}
							/>
							<canvas ref={canvasRef} aria-hidden="true" />
						</div>
					)}
				</div>
			</div>

			{workModalOpen && (
				<div className="modal-overlay" onClick={() => setWorkModalOpen(false)}>
					<div className="modal-box" onClick={(event) => event.stopPropagation()}>
						<button className="modal-close" onClick={() => setWorkModalOpen(false)} aria-label="Close">
							<Icon name="close" />
						</button>
						<div className="eyebrow-tag">Work Experience</div>
						<h3>Software Engineering Intern</h3>
						<div className="card-sub">HotCat Technologies (Pvt) Ltd</div>
						<div className="card-meta">
							<span><Icon name="calendar" /> Feb 2026 – Aug 2026</span>
							<span><Icon name="location" /> Wadduwa, Sri Lanka</span>
						</div>
						<ul className="modal-list">
							<li>Built responsive frontend interfaces and reusable components with React.js.</li>
							<li>Integrated REST APIs for authentication, dashboards, inventory and reporting modules.</li>
							<li>Collaborated in a hybrid team environment following real-world development workflows.</li>
						</ul>
						<div className="pill-row">
							{['React.js', 'REST APIs', 'Dashboards', 'Authentication', 'Inventory', 'Reporting'].map((tag) => (
								<span className="pill" key={tag}>{tag}</span>
							))}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
