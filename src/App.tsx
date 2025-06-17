import React, { useState, useCallback } from 'react';
import { Play, AlertCircle, ExternalLink, Download, Copy, Check } from 'lucide-react';
import VideoPlayer from './components/VideoPlayer';
import UrlInput from './components/UrlInput';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import Footer from './components/Footer';

interface VideoState {
  url: string;
  isLoading: boolean;
  error: string | null;
  videoData: {
    embedUrl?: string;
    directUrl?: string;
    title?: string;
  } | null;
}

function App() {
  const [videoState, setVideoState] = useState<VideoState>({
    url: '',
    isLoading: false,
    error: null,
    videoData: null,
  });

  const [copied, setCopied] = useState(false);

  const extractVideoData = useCallback(async (url: string) => {
    // TeraBox URL patterns and extraction logic
    const teraboxPatterns = [
      /terabox\.com\/s\/([a-zA-Z0-9_-]+)/,
      /terabox\.com\/sharing\/link\?surl=([a-zA-Z0-9_-]+)/,
      /1024terabox\.com\/s\/([a-zA-Z0-9_-]+)/,
      /teraboxapp\.com\/s\/([a-zA-Z0-9_-]+)/,
    ];

    let videoId = null;
    for (const pattern of teraboxPatterns) {
      const match = url.match(pattern);
      if (match) {
        videoId = match[1];
        break;
      }
    }

    if (!videoId) {
      throw new Error('Invalid TeraBox URL format. Please provide a valid TeraBox sharing link.');
    }

    // Attempt different embed strategies
    const embedStrategies = [
      `https://terabox.com/sharing/embed?surl=${videoId}`,
      `https://terabox.com/embed/${videoId}`,
      `https://1024terabox.com/sharing/embed?surl=${videoId}`,
    ];

    return {
      embedUrl: embedStrategies[0],
      directUrl: url,
      title: `TeraBox Video - ${videoId}`,
    };
  }, []);

  const handleUrlSubmit = useCallback(async (url: string) => {
    if (!url.trim()) {
      setVideoState(prev => ({ ...prev, error: 'Please enter a TeraBox URL' }));
      return;
    }

    setVideoState({
      url,
      isLoading: true,
      error: null,
      videoData: null,
    });

    try {
      const videoData = await extractVideoData(url);
      setVideoState(prev => ({
        ...prev,
        isLoading: false,
        videoData,
      }));
    } catch (error) {
      setVideoState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to process TeraBox URL',
      }));
    }
  }, [extractVideoData]);

  const handleCopyUrl = useCallback(async () => {
    if (videoState.videoData?.directUrl) {
      try {
        await navigator.clipboard.writeText(videoState.videoData.directUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy URL:', error);
      }
    }
  }, [videoState.videoData?.directUrl]);

  const handleReset = useCallback(() => {
    setVideoState({
      url: '',
      isLoading: false,
      error: null,
      videoData: null,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        
        <main className="mt-8">
          {!videoState.videoData ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Watch TeraBox Videos Online
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Paste your TeraBox video link below to watch it directly in your browser.
                    No downloads or installations required.
                  </p>
                </div>

                <UrlInput 
                  onSubmit={handleUrlSubmit}
                  isLoading={videoState.isLoading}
                  placeholder="https://terabox.com/s/your-video-link"
                />

                {videoState.isLoading && (
                  <div className="mt-8 flex justify-center">
                    <LoadingSpinner />
                  </div>
                )}

                {videoState.error && (
                  <div className="mt-6">
                    <ErrorMessage 
                      message={videoState.error}
                      onRetry={() => handleUrlSubmit(videoState.url)}
                    />
                  </div>
                )}

                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Supported URL Formats
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li>• https://terabox.com/s/xxxxxxxxx</li>
                    <li>• https://terabox.com/sharing/link?surl=xxxxxxxxx</li>
                    <li>• https://1024terabox.com/s/xxxxxxxxx</li>
                    <li>• https://teraboxapp.com/s/xxxxxxxxx</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {videoState.videoData.title}
                      </h2>
                      <p className="text-gray-600 text-sm mt-1">TeraBox Video Player</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopyUrl}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy URL'}
                      </button>
                      <a
                        href={videoState.videoData.directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open Original
                      </a>
                    </div>
                  </div>
                </div>

                <VideoPlayer
                  embedUrl={videoState.videoData.embedUrl!}
                  title={videoState.videoData.title!}
                  onError={(error) => setVideoState(prev => ({ ...prev, error }))}
                />
              </div>

              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Watch Another Video
                </button>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;