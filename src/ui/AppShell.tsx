import React from 'react';

type Props = {
  title: string;
  subtitle?: string;
  step: number;
  total: number;
  outline: React.ReactNode;   // left pane content
  children: React.ReactNode;  // right pane (existing form)
};

export default function AppShell({ title, subtitle, step, total, outline, children }: Props) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="grad-bg" style={{minHeight:'100dvh'}}>
      <div className="container">
        <div className="card split">
          {/* LEFT */}
          <aside className="left-rail">
            <h1 className="app-title">{title}</h1>
            {subtitle && <p className="subtitle">{subtitle}</p>}
            <div style={{marginTop:18}}>
              <div style={{fontWeight:700, marginBottom:8}}>Progress</div>
              <div aria-hidden style={{height:8, background:'rgba(255,255,255,.22)', borderRadius:8}}>
                <div style={{width:`${pct}%`, height:'100%', background:'#fff', borderRadius:8}}/>
              </div>
              <div style={{marginTop:8, opacity:.9}}>{`Step ${step} of ${total}`}</div>
            </div>
            <div style={{marginTop:16}}>{outline}</div>
          </aside>
          {/* RIGHT */}
          <main className="right-pane">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}