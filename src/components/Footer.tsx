import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Shield, Clock, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card/50 border-t border-border/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 主要内容区域 */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo和描述 */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Deeppaper
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              专业的AI质量检测平台，为您的学术作业提供智能化的质量分析与优化建议。
            </p>
          </div>

          {/* 服务特色 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">服务特色</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-primary" />
                <span>海量学术数据库</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>严格隐私保护</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>30秒快速分析</span>
              </li>
            </ul>
          </div>

          {/* 支持格式 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">支持格式</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>文档: DOC, DOCX, PDF, TXT</p>
              <p>演示: PPT, PPTX, KEY</p>
              <p>表格: XLS, XLSX</p>
              <p>图片: JPG, PNG</p>
            </div>
          </div>

          {/* 联系信息 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">获取帮助</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📱 添加企业微信获取QC报告</p>
              <p>⏰ 24小时内发送完整报告</p>
              <p>🔒 文件24小时后自动删除</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* 底部信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Deeppaper. 保护您的学术隐私，提升作业质量。
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>🚀 基于前沿AI技术</span>
            <span>🛡️ 隐私优先原则</span>
            <span>⚡ 极速质量检测</span>
          </div>
        </div>

        {/* 安全承诺 */}
        <div className="mt-8 p-4 bg-accent/30 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">隐私承诺:</strong> 您上传的所有文件仅用于本次质量分析，
              我们承诺不会将其用于任何其他用途，分析完成后24小时内自动删除，绝不留存备份。
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};