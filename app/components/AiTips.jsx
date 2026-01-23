'use client';

import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '@/app/context/AuthContext';

const API = '/api/ai/insights';
const CACHE_KEY = 'ai_tips_cache_v2';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Helper to hash user data for cache invalidation
function hashData(data) {
  if (!data) return '';
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  } catch {
    return '';
  }
}

const AiTips = () => {
  const { token } = useContext(AuthContext);
  const [tips, setTips] = useState([]);
  const fetchInProgress = useRef(false);

  useEffect(() => {
    if (!token || fetchInProgress.current) return;

    // Fetch user summary for cache key
    fetch('/api/user/summary', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((userSummary) => {
        if (!userSummary || Array.isArray(userSummary)) {
          userSummary = {};
        }
        const dataHash = hashData(userSummary);
        const cacheKey = `${CACHE_KEY}_${dataHash}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { tips: cachedTips, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setTips(cachedTips || []);
            return;
          }
        }

        fetchInProgress.current = true;
        fetch(API, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => res.json())
          .then((data) => {
            let fetchedTips = [];
            if (data && Array.isArray(data.tips)) {
              fetchedTips = data.tips;
            }
            setTips(fetchedTips);
            // Cache the tips with user data hash
            localStorage.setItem(
              cacheKey,
              JSON.stringify({ tips: fetchedTips, timestamp: Date.now() })
            );
            fetchInProgress.current = false;
          })
          .catch((err) => {
            console.error(err);
            setTips([]);
            fetchInProgress.current = false;
          });
      });
  }, [token]);

  return (
    <div className="tips-card">
      <h2>AI Spending Tips</h2>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default AiTips;
