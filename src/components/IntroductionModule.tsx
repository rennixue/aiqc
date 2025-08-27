import React from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Database, Shield } from 'lucide-react';
import aiTechImage from '@/assets/ai-tech.jpg';
import databaseImage from '@/assets/database.jpg';
import privacyImage from '@/assets/privacy.jpg';

interface FeatureCardProps {
  icon: React.ReactNode;
  image: string;
  title: string;
  subtitle: string;
  content: string[];
  isReversed?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  image, 
  title, 
  subtitle, 
  content, 
  isReversed = false 
}) => {
  return (
    <Card className="overflow-hidden shadow-elegant hover:shadow-xl transition-all duration-500 border-border/50 bg-card/80 backdrop-blur-sm">
      <div className={`grid md:grid-cols-2 gap-0 ${isReversed ? 'md:grid-flow-dense' : ''}`}>
        {/* 图片区域 */}
        <div className={`relative overflow-hidden ${isReversed ? 'md:col-start-2' : ''}`}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-64 md:h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="absolute top-6 left-6">
            <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>
        
        {/* 内容区域 */}
        <div className={`p-8 flex flex-col justify-center ${isReversed ? 'md:col-start-1' : ''}`}>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                {title}
              </h3>
              <h4 className="text-lg text-primary font-medium mb-4">
                {subtitle}
              </h4>
            </div>
            
            <div className="space-y-4">
              {content.map((paragraph, index) => {
                // 检查是否包含列表项
                if (paragraph.includes('- ')) {
                  const [intro, ...listItems] = paragraph.split('- ').filter(item => item.trim());
                  return (
                    <div key={index} className="space-y-2">
                      {intro && (
                        <p className="text-muted-foreground leading-relaxed">
                          {intro.trim()}
                        </p>
                      )}
                      <ul className="space-y-2 ml-4">
                        {listItems.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">
                              {item.trim()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                } else {
                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const IntroductionModule: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      image: aiTechImage,
      title: "尖端AI技术，重新定义质量检测",
      subtitle: "超越表面纠错，赋能深度学术洞察",
      content: [
        "我们依托前沿的人工智能技术，打造出新一代学术质量检测引擎。它不仅能处理文本，更能深度理解学术内涵。",
        "<ul>"
    + "<li><strong>底层架构：</strong>基于强大的自然语言处理（NLP）与深度学习架构，具备像人类专家一样的语义解析与逻辑推理能力。</li>"
    + "<li><strong>多维分析：</strong>对文本进行语法、结构、逻辑、论证效力及学术规范性的全方位、多模态扫描，精准定位深层问题。</li>"
    + "<li><strong>智能进化：</strong>系统依托持续学习机制，在不断处理海量优质学术文本中自我迭代，确保检测能力始终位于行业前沿。</li>"
    + "</ul>"
      ]
    },
    {
      icon: <Database className="w-6 h-6 text-white" />,
      image: databaseImage,
      title: "超庞大的数据库，更精准",
      subtitle: "海量学术数据，您的专属评分标准",
      content: [
        "判断精准，因为我们见识广。我们的系统经过海量优质学术数据的训练。",
        "覆盖全面： 内含百万篇各学科论文、作业和课件数据，支撑起庞大的知识点地图。- 对标标杆： 无论您是什么专业，您的作品都在与高质量的学术基准进行比对。- 洞察趋势： 了解不同院校的常见要求与误区，让您的作业更符合期待。"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      image: privacyImage,
      title: "超严格的隐私保护，更放心",
      subtitle: "您的隐私和安全，是我们第一原则",
      content: [
        "您的心血之作，我们用心守护。我们郑重承诺：",
        "绝对专用： 您的文件仅用于本次质量分析，我们绝不会将其用于任何其他用途，更不会泄露给任何第三方。- 匿名处理： 分析过程中，您的个人信息会被剥离，仅分析内容本身。- 及时销毁： 分析完成后，您的原始文件将在24小时内自动删除，不留存任何底稿，请放心使用。"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-background" id="introduction">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            为什么选择我们
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            专业的AI技术、海量的数据支撑、严格的隐私保护，让每一份作业都获得最优质的质量检测服务
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              image={feature.image}
              title={feature.title}
              subtitle={feature.subtitle}
              content={feature.content}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>

        {/* 底部CTA */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-primary shadow-elegant">
            <h3 className="text-2xl font-bold text-white mb-4">
              开始您的专业质量检测之旅
            </h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              上传您的作业，体验前所未有的AI质量检测服务
            </p>
            <button
              onClick={() => document.getElementById('ai-qc')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white/90 text-primary font-semibold rounded-lg hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg"
            >
              立即开始检测
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};