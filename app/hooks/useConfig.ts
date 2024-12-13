import { useState, useEffect } from 'react';
import yaml from 'yaml';

interface Activity {
  title: string;
  coverImage: string;
  description: string;
  date: string; 
  organizer: string;
}

// 定义展示项的接口
interface ShowcaseItem {
  title: string;
  image: string;
  author: string;
  date: string; 
}

// 定义配置接口
interface Config {
  activities: Activity[];
  showcase: ShowcaseItem[];
}

export function useConfig() {
  const [config, setConfig] = useState<Config>({ activities: [], showcase: [] });

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const configYaml = await response.text();
        const parsedConfig: Config = yaml.parse(configYaml);
        setConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to load configuration:', error);
      }
    }

    loadConfig();
  }, []);

  return { config };
}