import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/ai-qc-hero.jpg';

export const HeroSection: React.FC = () => {
  const scrollToAIQC = () => {
    document.getElementById('ai-qc')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-soft">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="AI Quality Control" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70" />
      </div>
      
      {/* 装饰性元素 */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* 主要内容 */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="space-y-8">
          {/* 标题区域 */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI 智能质量检测</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                作业质量智能检测
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              基于前沿AI技术，为您的作业和论文提供专业的质量分析与优化建议
              <br />
              <span className="text-primary font-medium">无需登录，即刻体验</span>
            </p>
          </div>

          {/* 特性亮点 */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              '🎯 精准检测语法与逻辑',
              '📊 海量数据库对比',
              '🔒 24小时内自动删除',
              '⚡ 30秒生成专业报告'
            ].map((feature, index) => (
              <div 
                key={index}
                className="px-4 py-2 bg-card/60 backdrop-blur-sm rounded-lg border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="group bg-gradient-primary hover:shadow-elegant transition-all duration-500 transform hover:scale-105"
              onClick={scrollToAIQC}
            >
              开始免费检测
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('introduction')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50"
            >
              了解更多
            </Button>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {[
              { number: '50K+', label: '已检测文稿' },
              { number: '98%', label: '准确率' },
              { number: '30s', label: '平均检测时间' },
              { number: '24h', label: '数据保护期限' }
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 底部滚动指示 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};